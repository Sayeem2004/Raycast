import { Action, ActionPanel, List, showToast, Toast } from "@raycast/api";
import { useEffect, useState } from "react";
import { loadCounters, saveCounters, daysSince, totalCount } from "./lib/storage";


export default function ViewCounter() {
    const [counters, setCounters] = useState<any[]>([]);

    useEffect(() => {
        const data = loadCounters();
        setCounters(data);
    }, []);

    function modifyCount(index: number, delta: number) {
        const updated = [...counters];
        updated[index].completed += delta;
        saveCounters(updated);
        setCounters(updated);

        showToast({
            style: Toast.Style.Success,
            title: `${delta > 0 ? "Incremented" : "Decremented"} ${updated[index].name}`,
        });
    }

    function removeCount(index: number) {
        const updated = [...counters];
        const removed = updated.splice(index, 1);
        saveCounters(updated);
        setCounters(updated);

        showToast({
            style: Toast.Style.Success,
            title: `Removed ${removed[0].name}`,
        });
    }

    return (
        <List searchBarPlaceholder="Search your exercise counters">
            {counters.length === 0 ? (
                <List.EmptyView
                    title="No Counters Available"
                    description="Use the 'Start Counter' command to create your first exercise counter."
                />
            ) : (
                counters.map((c: any, i: number) => {
                    const days = daysSince(c.startDate);
                    const countLeft = totalCount(days, c.baseCount, c.dailyIncrement, c.maximum) - c.completed;

                    return <List.Item
                        key={i}
                        title={c.name + `: ${c.completed} completed, ${countLeft} remaining`}
                        actions={
                            <ActionPanel>
                                <Action title="Increment" onAction={() => modifyCount(i, 1)} shortcut={{ modifiers: ["cmd"], key: "=" }} />
                                <Action title="Decrement" onAction={() => modifyCount(i, -1)} shortcut={{ modifiers: ["cmd"], key: "-" }} />
                                <Action title="Increment 10" onAction={() => modifyCount(i, 10)} shortcut={{ modifiers: ["shift", "cmd"], key: "=" }} />
                                <Action title="Decrement 10" onAction={() => modifyCount(i, -10)} shortcut={{ modifiers: ["shift", "cmd"], key: "-" }} />
                                <Action title="Remove Counter" onAction={() => removeCount(i)} shortcut={{ modifiers: ["shift", "cmd"], key: "delete" }} />
                            </ActionPanel>
                        }
                    />
                })
            )}
        </List>
    );
}
