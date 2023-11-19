import { Seo } from 'src/src2/components/seo';
import { usePageView } from 'src/src2/hooks/use-page-view';
import { Layout as MarketingLayout } from 'src/src2/layouts/marketing';
import { HomeCta } from 'src/src2/sections/home/home-cta';
import { HomeFaqs } from 'src/src2/sections/home/home-faqs';
import { HomeFeatures } from 'src/src2/sections/home/home-features';
import { HomeHero } from 'src/src2/sections/home/home-hero';
import { HomeReviews } from 'src/src2/sections/home/home-reviews';

const Page = () => {
  usePageView();

  return (
    <>
      <Seo />
      <main>
        <HomeHero />
        <HomeFeatures />
        <HomeReviews />
        <HomeCta />
        <HomeFaqs />
      </main>
    </>
  );
};

Page.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;

export default Page;
