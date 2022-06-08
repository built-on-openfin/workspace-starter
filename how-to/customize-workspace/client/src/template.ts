import { ButtonStyle, TemplateFragment, TemplateFragmentTypes } from "@openfin/workspace";

const PageActions = {
  delete: "page-delete",
  share: "page-share",
  launch: "page-launch"
};

const WorkspaceActions = {
  delete: "workspace-delete",
  share: "workspace-share",
  launch: "workspace-launch"
};

export const PageTemplate: {
  actions: { delete: string; share: string; launch: string };
  template: TemplateFragment;
} = {
  actions: PageActions,
  template: {
    type: TemplateFragmentTypes.Container,
    style: {
      paddingTop: "10px",
      display: "flex",
      flexDirection: "column"
    },
    children: [
      {
        type: TemplateFragmentTypes.Text,
        dataKey: "title",
        style: {
          fontWeight: "bold",
          fontSize: "16px",
          textAlign: "center"
        }
      },
      {
        type: TemplateFragmentTypes.Text,
        dataKey: "description",
        optional: true,
        style: {
          paddingLeft: "10px",
          paddingRight: "10px"
        }
      },
      {
        type: TemplateFragmentTypes.Text,
        dataKey: "instructions",
        style: {
          fontWeight: "bold",
          paddingTop: "10px",
          paddingBottom: "10px",
          paddingLeft: "10px",
          paddingRight: "10px"
        }
      },
      {
        type: TemplateFragmentTypes.Container,
        style: {
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
          paddingTop: "10px",
          paddingBottom: "10px"
        },
        children: [
          {
            type: TemplateFragmentTypes.Button,
            style: {
              display: "flex",
              flexDirection: "column",
              width: "80px"
            },
            action: PageActions.launch,
            children: [
              {
                type: TemplateFragmentTypes.Text,
                dataKey: "openText",
                optional: false
              }
            ]
          },
          {
            type: TemplateFragmentTypes.Button,
            buttonStyle: ButtonStyle.Primary,
            style: {
              display: "flex",
              flexDirection: "column",
              width: "80px",
              marginLeft: "10px",
              marginRight: "10px"
            },
            action: PageActions.delete,
            children: [
              {
                type: TemplateFragmentTypes.Text,
                dataKey: "deleteText",
                optional: false
              }
            ]
          },
          {
            type: TemplateFragmentTypes.Button,
            buttonStyle: ButtonStyle.Primary,
            style: {
              display: "flex",
              flexDirection: "column",
              width: "80px"
            },
            action: PageActions.share,
            children: [
              {
                type: TemplateFragmentTypes.Text,
                dataKey: "shareText",
                optional: false
              }
            ]
          }
        ]
      }
    ]
  }
};

export const WorkspaceTemplate: {
  actions: { delete: string; share: string; launch: string };
  template: TemplateFragment;
} = {
  actions: WorkspaceActions,
  template: {
    type: TemplateFragmentTypes.Container,
    style: {
      paddingTop: "10px",
      display: "flex",
      flexDirection: "column"
    },
    children: [
      {
        type: TemplateFragmentTypes.Text,
        dataKey: "title",
        style: {
          fontWeight: "bold",
          fontSize: "16px",
          textAlign: "center"
        }
      },
      {
        type: TemplateFragmentTypes.Text,
        dataKey: "instructions",
        optional: true,
        style: {
          fontWeight: "bold",
          paddingTop: "10px",
          paddingBottom: "10px",
          paddingLeft: "10px",
          paddingRight: "10px"
        }
      },
      {
        type: TemplateFragmentTypes.Container,
        style: {
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
          paddingTop: "10px",
          paddingBottom: "10px"
        },
        children: [
          {
            type: TemplateFragmentTypes.Button,
            style: {
              display: "flex",
              flexDirection: "column",
              width: "80px"
            },
            action: WorkspaceActions.launch,
            children: [
              {
                type: TemplateFragmentTypes.Text,
                dataKey: "openText",
                optional: false
              }
            ]
          },
          {
            type: TemplateFragmentTypes.Button,
            buttonStyle: ButtonStyle.Primary,
            style: {
              display: "flex",
              flexDirection: "column",
              width: "80px",
              marginLeft: "10px",
              marginRight: "10px"
            },
            action: WorkspaceActions.delete,
            children: [
              {
                type: TemplateFragmentTypes.Text,
                dataKey: "deleteText",
                optional: false
              }
            ]
          },
          {
            type: TemplateFragmentTypes.Button,
            buttonStyle: ButtonStyle.Primary,
            style: {
              display: "flex",
              flexDirection: "column",
              width: "80px"
            },
            action: WorkspaceActions.share,
            children: [
              {
                type: TemplateFragmentTypes.Text,
                dataKey: "shareText",
                optional: false
              }
            ]
          }
        ]
      }
    ]
  }
};

export const CurrentWorkspaceTemplate: {
  template: TemplateFragment;
} = {
  template: {
    type: TemplateFragmentTypes.Container,
    style: {
      paddingTop: "10px",
      display: "flex",
      flexDirection: "column"
    },
    children: [
      {
        type: TemplateFragmentTypes.Text,
        dataKey: "title",
        style: {
          fontWeight: "bold",
          fontSize: "16px",
          textAlign: "center"
        }
      },
      {
        type: TemplateFragmentTypes.Text,
        dataKey: "instructions",
        optional: true,
        style: {
          fontWeight: "bold",
          paddingTop: "10px",
          paddingBottom: "10px",
          paddingLeft: "10px",
          paddingRight: "10px"
        }
      }
    ]
  }
};
