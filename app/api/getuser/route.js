import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DB_URL);

export async function GET(request) {
    try {
        const user = await sql`SELECT * FROM users`;
        console.log('user', user);
        return Response.json({ success: true, user });
    } catch (error) {
        return Response.json({ success: false, error: error.message });
    }
}