import { ButtonStyle, TemplateFragment, TemplateFragmentTypes } from "@openfin/workspace";

export const HomePageTemplate: TemplateFragment = {
    type: TemplateFragmentTypes.Container,
    style: {
        paddingTop: '10px',
        display: 'flex',
        flexDirection: 'column'
    },
    children: [
        {
            type: TemplateFragmentTypes.Text,
            dataKey: 'title',
            style: {
                fontWeight: 'bold',
                fontSize: '16px',
                textAlign: 'center'
            }
        },
        {
            type: TemplateFragmentTypes.Text,
            dataKey: 'description',
            style: {
                fontWeight: 'bold',
            }
        },
        {
            type: TemplateFragmentTypes.Text,
            dataKey: 'instructions',
            style: {
                paddingTop:'10px',
                paddingBottom:'10px',
                paddingLeft:'10px',
                paddingRight:'10px',
            }
        },
        {
            type: TemplateFragmentTypes.Container,
            style: {
                display: 'flex',
                flexFlow: 'row wrap',
                justifyContent: 'center',
                paddingTop: '10px',
                paddingBottom: '10px'
            },
            children: [
                {
                    type: TemplateFragmentTypes.Button,
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        width: '80px'
                    },
                    action: 'open-page',
                    children: [
                        {
                            type: TemplateFragmentTypes.Text,
                            dataKey: 'openText',
                            optional: true
                        }
                    ]
                },
                {
                    type: TemplateFragmentTypes.Button,
                    buttonStyle: ButtonStyle.Primary,
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        width: '80px',
                        marginLeft: '10px',
                        marginRight: '10px'
                    },
                    action: 'delete-page',
                    children: [
                        {
                            type: TemplateFragmentTypes.Text,
                            dataKey: 'deleteText',
                            optional: true
                        }
                    ]
                },
                {
                    type: TemplateFragmentTypes.Button,
                    buttonStyle: ButtonStyle.Primary,
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        width: '80px'
                    },
                    action: 'share-page',
                    children: [
                        {
                            type: TemplateFragmentTypes.Text,
                            dataKey: 'shareText',
                            optional: true
                        }
                    ]
                }
            ]
        }
    ]
};