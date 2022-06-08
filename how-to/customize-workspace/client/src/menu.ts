import {
  GlobalContextMenuItemTemplate,
  GlobalContextMenuOptionType,
  PageTabContextMenuItemTemplate,
  PageTabContextMenuOptionType,
  ViewTabContextMenuTemplate,
  ViewTabMenuOptionType
} from "@openfin/workspace-platform";

function updateGlobalMenuEntry(
  menuEntries: GlobalContextMenuItemTemplate[],
  dataType: string,
  action: "REPLACE-LABEL" | "INSERT-BEFORE" | "INSERT-AFTER" | "DELETE",
  entry?: GlobalContextMenuItemTemplate
) {
  const entryIndex = menuEntries.findIndex(
    (menuEntry) => menuEntry.data !== undefined && menuEntry.data.type === dataType
  );
  if (entryIndex === -1) {
    console.warn("Unable to find global menu with entry type: " + dataType);
  } else {
    switch (action) {
      case "DELETE": {
        menuEntries.splice(entryIndex);
        break;
      }
      case "REPLACE-LABEL": {
        if (entry === undefined || entry.label === undefined) {
          console.warn(
            "Asked to replace label of menu entry but not provided an entry to grab a label from or given an empty label. Target menu data type: " +
              dataType
          );
        } else {
          menuEntries[entryIndex].label = entry.label;
        }
        break;
      }
      case "INSERT-AFTER": {
        if (entry === undefined) {
          console.warn(
            `You cannot insert a menu entry after the menu entry with data type: ${dataType} if you do not specify a menu entry`
          );
        } else {
          menuEntries.splice(entryIndex + 1, 0, entry);
        }
        break;
      }
      case "INSERT-BEFORE": {
        if (entry === undefined) {
          console.warn(
            `You cannot insert a menu entry before the menu entry with data type: ${dataType} if you do not specify a menu entry`
          );
        } else if (entryIndex === 0) {
          menuEntries.unshift(entry);
        } else {
          menuEntries.splice(entryIndex - 1, 0, entry);
        }
        break;
      }
    }
  }
  return menuEntries;
}

export async function getGlobalMenu(
  defaultGlobalContextMenu: GlobalContextMenuItemTemplate[] = []
): Promise<GlobalContextMenuItemTemplate[]> {
  let menuItems = updateGlobalMenuEntry(
    defaultGlobalContextMenu,
    GlobalContextMenuOptionType.OpenStorefront,
    "INSERT-AFTER",
    {
      label: "Toggle Notification Center",
      data: {
        type: GlobalContextMenuOptionType.Custom,
        action: {
          id: "notification-toggle"
        }
      }
    }
  );

  menuItems = updateGlobalMenuEntry(menuItems, GlobalContextMenuOptionType.OpenStorefront, "INSERT-AFTER", {
    label: "Open Home",
    data: {
      type: GlobalContextMenuOptionType.Custom,
      action: {
        id: "home-show"
      }
    }
  });

  menuItems = updateGlobalMenuEntry(menuItems, GlobalContextMenuOptionType.Quit, "REPLACE-LABEL", {
    type: "normal",
    label: "Quit App",
    data: {
      type: GlobalContextMenuOptionType.Quit
    }
  });

  return menuItems;
}

export async function getPageMenu(
  defaultPageContextMenu: PageTabContextMenuItemTemplate[] = []
): Promise<PageTabContextMenuItemTemplate[]> {
  const menuTemplate: PageTabContextMenuItemTemplate[] = [
    {
      label: "Move Page to new Window",
      data: {
        type: PageTabContextMenuOptionType.Custom,
        action: {
          id: "move-page-to-new-window"
        }
      }
    },
    {
      type: "separator",
      data: undefined
    },
    ...defaultPageContextMenu
  ];
  return menuTemplate;
}

export async function getViewMenu(
  defaultViewContextMenu: ViewTabContextMenuTemplate[] = []
): Promise<ViewTabContextMenuTemplate[]> {
  const menuTemplate: ViewTabContextMenuTemplate[] = [
    {
      label: "Move View(s) to new Window",
      data: {
        type: ViewTabMenuOptionType.Custom,
        action: {
          id: "move-view-to-new-window"
        }
      }
    },
    {
      type: "separator",
      data: undefined
    },
    ...defaultViewContextMenu
  ];
  return menuTemplate;
}
