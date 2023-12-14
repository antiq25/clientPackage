import { useCallback, useEffect } from 'react';
import { GuestGuard } from 'src/src2/guards/guest-guard';
import { IssuerGuard } from 'src/src2/guards/issuer-guard';
import { useAuth } from 'src/src2/hooks/use-auth';
import { paths } from 'src/src2/paths';
import { Issuer } from 'src/src2/utils/auth';

const Page = () => {
  const { loginWithRedirect } = useAuth();

  const handle = useCallback(async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const returnTo = searchParams.get('returnTo');
    await loginWithRedirect({
      returnTo: returnTo || paths.dashboard.index,
    });
  }, [loginWithRedirect]);

  useEffect(
    () => {
      handle();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return null;
};

Page.getLayout = (page) => (
  <IssuerGuard issuer={Issuer.Auth0}>
    <GuestGuard>{page}</GuestGuard>
  </IssuerGuard>
);

export default Page;
