import { List } from "@raycast/api";
import { loadCounters, daysSince, totalCount } from "./lib/storage";


export default function ViewCounters() {
    const counters = loadCounters();

    return (
        <List searchBarPlaceholder="Search your exercise counters">
            {counters.length === 0 ? (
                <List.EmptyView
                    title="No Counters Found"
                    description="Use the 'Start Counter' command to create your first exercise counter."
                />
            ) : (
                counters.map((c: any, i: number) => {
                    const days = daysSince(c.startDate);
                    const countLeft = totalCount(days, c.baseCount, c.dailyIncrement, c.maximum) - c.completed;
                    return <List.Item key={i} title={`${c.name}: ${countLeft} remaining`} />;
                })
            )}
        </List>
    );
}
