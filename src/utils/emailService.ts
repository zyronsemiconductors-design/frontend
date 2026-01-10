interface SendEmailParams {
    endpoint: string;
    data: Record<string, any>;
}

export const sendEmail = async ({ endpoint, data }: SendEmailParams) => {
    const baseUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

    const res = await fetch(`${baseUrl.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
        let errorMessage = result.message || "Failed to send email";

        // If there are validation errors from express-validator
        if (result.errors && Array.isArray(result.errors) && result.errors.length > 0) {
            errorMessage = result.errors.map((err: any) => err.msg).join(", ");
        }

        throw new Error(errorMessage);
    }

    return result;
};
