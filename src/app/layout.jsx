import { SiteShell } from "../site";
import "../styles.css";
import "../video-match.css";
import "../pizza-theme.css";
import "../napoli-fonts.css";
import "../napoli-theme.css";

export const metadata = {
  title: {
    default: "Luigi’s Pizza — Good times, great pizza",
    template: "%s — Luigi’s Pizza",
  },
  description: "Luigi’s Pizza — wood-fired pizzas, golden garlic bread, stacked burgers, and good times.",
  icons: { icon: "/assets/pizza/favicon.svg" },
};

export const viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><SiteShell>{children}</SiteShell></body>
    </html>
  );
}
