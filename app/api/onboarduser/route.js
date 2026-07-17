import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DB_URL);

export async function POST(request) {
    try {
        const body = await request.json();
        const {
            clerkId,
            email = null,
            firstName = null,
            lastName = null,
            imageUrl = null,
        } = body;

        if (!clerkId) {
            return Response.json(
                { success: false, error: "clerkId is required" },
                { status: 400 }
            );
        }
        console.log('clerkId', body);
        const result = await sql`
            SELECT * FROM onboard_user(
                ${clerkId}::text,
                ${email}::text,
                ${firstName}::text,
                ${lastName}::text,
                ${imageUrl}::text
            )
        `;

        return Response.json({ success: true, user: result[0] });
    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}