import { AuthGuard } from 'src/src2/guards/auth-guard';

export const withAuthGuard = (Component) => {
  return function WithAuthGuard(props) {
    return (
      <AuthGuard>
        <Component {...props} />
      </AuthGuard>
    );
  };
};
