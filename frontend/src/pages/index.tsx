import { useSearch } from 'contexts/SearchContext';
import ProductsOrganism from 'components/organisms/ProductsOrganism';
import withMercadoLivre from 'hocs/withMercadolivre';
import SelectProductsSourceOrganism from 'components/organisms/SelectProductsSourceOrganism';

import withFakeStore from 'hocs/withFakeStore';

const IndexPage = () => {
  const { state } = useSearch();

  if (state.selectedSource?.id === 'mercadolivre') {
    return withMercadoLivre(ProductsOrganism);
  }

  if (state.selectedSource?.id === 'fakestore') {
    return withFakeStore(ProductsOrganism);
  }

  return <SelectProductsSourceOrganism />;
};

export default IndexPage;
