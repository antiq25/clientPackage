import { useTheme } from '@mui/system';

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <svg
      width="48"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 .587l3.515 7.125 7.985.768-5.75 5.405 1.363 7.94L12 18.09l-7.113 3.735 1.363-7.94-5.75-5.405 7.985-.768L12 .587z"
        fill={fillColor}
      />
    </svg>
  );
};
