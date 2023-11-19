import { GuestGuard } from 'src/src2/guards/guest-guard';

export const withGuestGuard = (Component) => {
  return function WithGuestGuard(props) {
    return (
      <GuestGuard>
        <Component {...props} />
      </GuestGuard>
    );
  };
};
