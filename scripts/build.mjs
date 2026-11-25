import { build, context } from "esbuild";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const serve = process.argv.includes("--serve");
const dist = resolve(root, serve ? ".dev" : "dist");
await mkdir(dist, { recursive: true });

const options = {
  absWorkingDir: root,
  entryPoints: ["src/main.jsx"],
  outdir: dist,
  bundle: true,
  write: false,
  format: "iife",
  jsx: "automatic",
  target: "es2020",
  minify: !serve,
  legalComments: "inline",
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      serve ? "development" : "production",
    ),
  },
  loader: { ".woff2": "dataurl", ".webp": "dataurl", ".png": "dataurl" },
  plugins: [
    {
      name: "portable-html",
      setup(builder) {
        builder.onEnd(async (result) => {
          if (result.errors.length) return;
          const template = await readFile(
            resolve(root, "template.html"),
            "utf8",
          );
          const css = result.outputFiles.find((file) =>
            file.path.endsWith(".css"),
          ).text;
          const js = result.outputFiles.find((file) =>
            file.path.endsWith(".js"),
          ).text;
          const reload = serve
            ? 'new EventSource("/esbuild").addEventListener("change", () => location.reload());'
            : "";
          const page = template
            .replace("<!-- styles -->", () => `<style>\n${css}\n</style>`)
            .replace(
              "<!-- application -->",
              () =>
                `<script>\n${js.replace(/<\/script/gi, "<\\/script")}\n${reload}\n</script>`,
            );
          await writeFile(resolve(dist, "airsoft.html"), page);
        });
      },
    },
  ],
};

if (serve) {
  const dev = await context(options);
  await dev.watch();
  const { port } = await dev.serve({
    host: "127.0.0.1",
    servedir: dist,
    fallback: resolve(dist, "airsoft.html"),
  });
  console.log(`http://127.0.0.1:${port}/airsoft.html`);
} else {
  await build(options);
  console.log("dist/airsoft.html");
}
