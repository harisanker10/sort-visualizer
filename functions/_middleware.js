export async function onRequest(context) {
  try {
    const now = Date.now();
    const task = await context.env.analytics.put(`${now}`);
    console.log({ task });
    return await context.next();
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}
