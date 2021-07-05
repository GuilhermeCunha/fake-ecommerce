import { useMediaQuery } from 'react-responsive';

export type UseResponsiveStateState = {
  isTabletOrMobile: boolean;
  isDesktop: boolean;
};
const useResponsiveState = (): UseResponsiveStateState => {
  const isDesktop = useMediaQuery({ minDeviceWidth: 1225 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  return {
    isDesktop,
    isTabletOrMobile,
  };
};

export default useResponsiveState;
