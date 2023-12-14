import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { Seo } from 'src/src2/components/seo';
import { usePageView } from 'src/src2/hooks/use-page-view';
import { Layout as ComponentsLayout } from 'src/src2/layouts/components';
import { Layout as MarketingLayout } from 'src/src2/layouts/marketing';
import { Previewer } from 'src/src2/sections/components/previewer';
import { Colors1 } from 'src/src2/sections/components/colors/colors-1';
import { Colors2 } from 'src/src2/sections/components/colors/colors-2';

const components = [
  {
    element: <Colors1 />,
    title: 'Main colors',
  },
  {
    element: <Colors2 />,
    title: 'Severity colors',
  },
];

const Page = () => {
  usePageView();

  return (
    <>
      <Seo title="Components: Colors" />
      <ComponentsLayout title="Colors">
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Stack spacing={8}>
              {components.map((component) => (
                <Previewer
                  key={component.title}
                  title={component.title}
                >
                  {component.element}
                </Previewer>
              ))}
            </Stack>
          </Container>
        </Box>
      </ComponentsLayout>
    </>
  );
};

Page.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;

export default Page;
