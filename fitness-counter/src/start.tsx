import { Action, ActionPanel, Form, showToast, Toast } from "@raycast/api";
import { loadCounters, saveCounters } from "./lib/storage";


export default function StartCounter() {
    async function handleSubmit(
        values: { name: string; baseCount: string; dailyIncrement: string; maximum: string; startDate: Date; }
    ) {
        const data = loadCounters();
        data.push({
            name: values.name,
            startDate: values.startDate.toISOString().split("T")[0],  // Format as YYYY-MM-DD
            baseCount: parseInt(values.baseCount),
            dailyIncrement: parseInt(values.dailyIncrement),
            maximum: parseInt(values.maximum),
            completed: 0,
        });
        saveCounters(data);
        showToast({ style: Toast.Style.Success, title: "Counter Created!" });
    }

    return (
        <Form
            actions={
            <ActionPanel>
                <Action.SubmitForm title="Create Counter" onSubmit={handleSubmit} />
            </ActionPanel>
            }
        >
            <Form.TextField id="name" title="Name" />
            <Form.TextField id="baseCount" title="Base Count" defaultValue="1" />
            <Form.TextField id="dailyIncrement" title="Daily Increment" defaultValue="1" />
            <Form.TextField id="maximum" title="Maximum" defaultValue="100" />
            <Form.DatePicker id="startDate" title="Start Date" defaultValue={new Date()} type={Form.DatePicker.Type.Date} />
        </Form>
    );
}
