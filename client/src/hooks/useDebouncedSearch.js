import { useDispatch } from "react-redux";
import lodash from "lodash";
import { debouncedSearchProducts } from "../../store/features/productSlice";

const useDebouncedSearch = () => {
  const dispatch = useDispatch();

  return lodash.debounce((query) => {
    dispatch(debouncedSearchProducts(query));
  }, 500);
};

export default useDebouncedSearch;
