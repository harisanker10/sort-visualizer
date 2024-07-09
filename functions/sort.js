export default {
  async fetch(request) {
    console.log({ request });
    const destinationURL = "https://366f0776.sort-visualizer-4sv.pages.dev";
    const statusCode = 301;
    return Response.redirect(destinationURL, statusCode);
  },
};
