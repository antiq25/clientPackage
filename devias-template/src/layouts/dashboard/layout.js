import PropTypes from 'prop-types';

// import { withAuthGuard } from 'src/src2/hocs/with-auth-guard';
import { useSettings } from 'src/hooks/use-settings';
import { useSections } from 'src/layouts/dashboard/config';
import { HorizontalLayout } from 'src/layouts/dashboard/horizontal-layout';
import { VerticalLayout } from 'src/layouts/dashboard/vertical-layout';

export const Layout =((props) => {
  const settings = useSettings();
  const sections = useSections();

  if (settings.layout === 'horizontal') {
    return (
      <HorizontalLayout
        sections={sections}
        navColor={settings.navColor}
        {...props}
      />
    );
  }

  return (
    <VerticalLayout
      sections={sections}
      navColor={settings.navColor}
      {...props}
    />
  );
});

Layout.propTypes = {
  children: PropTypes.node,
};
