import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      bio: "https://cups-code.github.io/hotcuppa/bio",
      rss: "https://cups-code.github.io/hotcuppa/index.xml",
      dotfiles: "https://github.com/cups-code/dotfiles",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.MobileOnly(Component.ReaderMode()) },
      ],
    }),
    Component.Explorer({ title: "directories" }),
    Component.DesktopOnly(Component.RecentNotes({ title: "recent writing", limit: 3 })),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
  afterBody: [
    Component.Comments({
      provider: "giscus",
      options: {
        // from data-repo
        repo: "cups-code/hotcuppa",
        // from data-repo-id
        repoId: "R_kgDOOa_mWA",
        // from data-category
        category: "Announcements",
        // from data-category-id
        categoryId: "DIC_kwDOOa_mWM4Ctr6l",
        // from data-lang
        lang: "en",
      },
    }),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({ title: "directory" }),
    Component.DesktopOnly(Component.RecentNotes({ title: "recent writing", limit: 3 })),
  ],
  right: [],
}
