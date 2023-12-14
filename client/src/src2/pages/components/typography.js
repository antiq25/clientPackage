import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { Seo } from 'src/src2/components/seo';
import { usePageView } from 'src/src2/hooks/use-page-view';
import { Layout as ComponentsLayout } from 'src/src2/layouts/components';
import { Layout as MarketingLayout } from 'src/src2/layouts/marketing';
import { Previewer } from 'src/src2/sections/components/previewer';
import { Typography1 } from 'src/src2/sections/components/typography/typography-1';

const Page = () => {
  usePageView();

  return (
    <>
      <Seo title="Components: Typography" />
      <ComponentsLayout title="Typography">
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Previewer title="Typography">
              <Typography1 />
            </Previewer>
          </Container>
        </Box>
      </ComponentsLayout>
    </>
  );
};

Page.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;

export default Page;
