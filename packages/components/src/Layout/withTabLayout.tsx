import { Box } from '../index';

export function withTabLayout(WrappedComponent: any): () => JSX.Element {
  return function TabLayoutWrapper() {
    return (
      <Box flex={1}>
        <WrappedComponent />
      </Box>
    );
  };
}
