export async function onRequest(context) {
  try {
    console.log({ context });
    const task = await context.env.sort_visualizer.get("name");
    console.log({ task });
    return await context.next();
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}
