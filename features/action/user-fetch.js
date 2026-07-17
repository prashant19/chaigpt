


export function onBoardUser(clerkId, email, firstName, lastName, imageUrl) {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3002";
    console.log('jjustdoit', clerkId, email, firstName, lastName, imageUrl);
    const abc = JSON.stringify({
        clerkId: clerkId,
        email: email,
        firstName: firstName,
        lastName: lastName,
        imageUrl: imageUrl,
    })
    console.log('abc', abc)
    const res = fetch(`${baseUrl}/api/onboarduser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: abc,
    })
    //return res.json();
}