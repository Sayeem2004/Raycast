import fs from "fs";
import path from "path";


export const DATA_PATH = path.resolve(__dirname, "./data/counters.json");


export function loadCounters(): any[] {
    if (!fs.existsSync(DATA_PATH)) {
        fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
        fs.writeFileSync(DATA_PATH, "[]", "utf-8");
    }
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
}


export function saveCounters(counters: any[]) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(counters, null, 4), "utf-8");
}


export function daysSince(dateStr: string): number {
    const start = new Date(dateStr);
    const today = new Date();
    return Math.floor((today.getTime() - start.getTime()) / (1000 * 3600 * 24));
}


export function totalCount(days: number, baseCount: number, dailyIncrement: number, maximum: number): number {
    if (days >= maximum) {
        const normalCount = baseCount * maximum + dailyIncrement * (maximum * (maximum - 1)) / 2;
        const maxCount = (days - maximum + 1) * maximum;
        return normalCount + maxCount;
    }
    return baseCount * (days + 1) + dailyIncrement * (days * (days + 1)) / 2;
}
