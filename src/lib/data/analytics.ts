import { unstable_cache } from "next/cache";
import { connectToDatabase } from "@/lib/db/connection";
import SubmissionModel from "@/lib/db/models/Submission";

export interface CityStats {
  city: string;
  count: number;
  avgCost: number;
}

export interface CategoryAvg {
  category: string;
  label: string;
  avgAmount: number;
}

export interface VenueStat {
  venue: string;
  count: number;
}

export interface AnalyticsData {
  totalSubmissions: number;
  avgTotalCost: number;
  avgCostPerGuest: number;
  citiesRepresented: number;
  byCityStats: CityStats[];
  categoryAvgs: CategoryAvg[];
  topVenues: VenueStat[];
}

const CATEGORY_LABELS: Record<string, string> = {
  venue:         "Venue",
  catering:      "Catering",
  photography:   "Photography",
  clothing:      "Clothing",
  jewelry:       "Jewelry",
  decoration:    "Decoration",
  makeup:        "Makeup",
  gateDhora:     "Gate Dhora",
  miscellaneous: "Miscellaneous",
};

export const getAnalytics = unstable_cache(
  async (): Promise<AnalyticsData> => {
    await connectToDatabase();

    const [result] = await SubmissionModel.aggregate([
      { $match: { status: "approved" } },
      {
        $facet: {
          summary: [
            {
              $group: {
                _id:             null,
                totalSubmissions: { $sum: 1 },
                avgTotalCost:    { $avg: "$totalCost" },
                avgCostPerGuest: { $avg: { $divide: ["$totalCost", "$guestCount"] } },
              },
            },
          ],
          cities: [
            { $group: { _id: "$city" } },
            { $count: "total" },
          ],
          byCity: [
            {
              $group: {
                _id:     "$city",
                count:   { $sum: 1 },
                avgCost: { $avg: "$totalCost" },
              },
            },
            { $sort: { count: -1 } },
            { $limit: 10 },
          ],
          categoryAvgs: [
            {
              $group: {
                _id:          null,
                venue:         { $avg: "$costs.venue" },
                catering:      { $avg: "$costs.catering" },
                photography:   { $avg: "$costs.photography" },
                clothing:      { $avg: "$costs.clothing" },
                jewelry:       { $avg: "$costs.jewelry" },
                decoration:    { $avg: "$costs.decoration" },
                makeup:        { $avg: "$costs.makeup" },
                gateDhora:     { $avg: "$costs.gateDhora" },
                miscellaneous: { $avg: "$costs.miscellaneous" },
              },
            },
          ],
          topVenues: [
            { $group: { _id: "$venueName", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 8 },
          ],
        },
      },
    ]);

    const summary   = result?.summary?.[0]   ?? null;
    const catRaw    = result?.categoryAvgs?.[0] ?? {};

    const byCityStats: CityStats[] = (result?.byCity ?? []).map(
      (r: { _id: string; count: number; avgCost: number }) => ({
        city:    r._id,
        count:   r.count,
        avgCost: Math.round(r.avgCost),
      })
    );

    const categoryAvgs: CategoryAvg[] = Object.keys(CATEGORY_LABELS)
      .map((key) => ({
        category:  key,
        label:     CATEGORY_LABELS[key],
        avgAmount: Math.round(catRaw[key] ?? 0),
      }))
      .filter((c) => c.avgAmount > 0)
      .sort((a, b) => b.avgAmount - a.avgAmount);

    const topVenues: VenueStat[] = (result?.topVenues ?? []).map(
      (r: { _id: string; count: number }) => ({ venue: r._id, count: r.count })
    );

    return {
      totalSubmissions:  summary?.totalSubmissions  ?? 0,
      avgTotalCost:      Math.round(summary?.avgTotalCost ?? 0),
      avgCostPerGuest:   Math.round(summary?.avgCostPerGuest ?? 0),
      citiesRepresented: result?.cities?.[0]?.total ?? 0,
      byCityStats,
      categoryAvgs,
      topVenues,
    };
  },
  ["analytics-data"],
  { revalidate: 86400 }
);
