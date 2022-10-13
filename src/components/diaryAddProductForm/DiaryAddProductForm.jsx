import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { productSearch } from 'redux/productSearch/productSearchOperations';
import { selectProducts } from 'redux/productSearch/productSearchSelectors';
import { addDay, addDayInfo } from 'redux/day/dayOperations';
import Box from 'components/common/box';
import { resetState } from 'redux/productSearch/productSearchSlice';
import {
  StyledProductForm,
  StyledNameWrapper,
  InputStyledNameProduct,
  StyledWeightWrapper,
  InputStyledWeightProduct,
  StyledButtonIcon,
  StyledIcon,
  // StyledSelect,
  // StyledOption,
} from './DiaryAddProductForm.styled';
import addIcon from 'assets/icons/addProduct.svg';
import Select from '@mui/material/Select';

export default function DiaryAddProductForm({ date }) {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [searchProduct, setSearchProduct] = useState('');
  const [selectProduct, setSelectProduct] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(null);
  const validationSchema = yup.object({
    productName: yup
      .string('Выберите продукт из списка')
      .required('Продукт обязателен!'),
    productWeight: yup
      .number('Введите число')
      .typeError('Введите число')
      .positive()
      .integer()
      .min(10, 'Введите больший вес')
      .max(1000, 'Введите меньший вес')
      .required('Вес обязателен!'),
  });

  const formik = useFormik({
    initialValues: {
      productName: '',
      productWeight: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (selectProduct) return;
    if (debouncedValue) {
      clearTimeout(debouncedValue);
    }
    setDebouncedValue(
      setTimeout(() => dispatch(productSearch(formik.values.productName)), 500)
    );
    // eslint-disable-next-line
  }, [formik.values.productName]);

  //*select products from list
  const handleChangeMultiple = ({ target }) => {
    formik.setFieldValue(
      'productName',
      target.options[target.selectedIndex].title
    );
    setSelectProduct(target.options[target.selectedIndex].value);
    dispatch(resetState());
  };

  function handleSubmit(values) {
    const obj = {
      date: date.toISOString().split('T')[0],
      productId: selectProduct,
      weight: values.productWeight,
    };
    dispatch(addDay(obj));
    setSearchProduct('');
    formik.resetForm();
  }

  const selectRef = useRef();

  const handleClick = useCallback(
    e => {
      const path = e.path || (e.composedPath && e.composedPath());
      if (!path.includes(selectRef.current)) {
        dispatch(resetState());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    document.body.addEventListener('click', handleClick);

    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  const inputClick = e => {
    setSelectProduct('');
    formik.setFieldValue('productName', e.target.value);
  };

  return (
    <>
      <Box position="relative">
        <StyledProductForm onSubmit={formik.handleSubmit}>
          <StyledNameWrapper>
            <InputStyledNameProduct
              // sx={{ width: '240px' }}
              id="productName"
              name="productName"
              autoComplete="off"
              label="Введите название продукта"
              onChange={inputClick}
              onBlur={formik.handleBlur}
              value={formik.values.productName}
              error={
                //!selectProduct $$ formik.values.productName.length!=0
                // ? 'выберите продукт'
                //   : null
                formik.touched.productName && Boolean(formik.errors.productName)
              }
              helperText={
                formik.touched.productName && formik.errors.productName
              }
              variant="standard"
            />
          </StyledNameWrapper>

          <StyledWeightWrapper>
            <InputStyledWeightProduct
              id="productWeight"
              name="productWeight"
              autoComplete="off"
              label="Граммы"
              onChange={formik.handleChange}
              value={formik.values.productWeight}
              error={
                formik.touched.productWeight &&
                Boolean(formik.errors.productWeight)
              }
              helperText={
                formik.touched.productWeight && formik.errors.productWeight
              }
              variant="standard"
            />
          </StyledWeightWrapper>
          <StyledButtonIcon type="submit" aria-label="добавить продукт">
            <StyledIcon src={addIcon} />
          </StyledButtonIcon>
        </StyledProductForm>

        {products?.length > 0 && (
          <Select
            multiple
            native
            value={products}
            // @ts-ignore Typings are not considering `native`
            onChange={handleChangeMultiple}
            label="Выберите продукт"
            // inputProps={{
            //   id: 'productName',
            // }}
            ref={selectRef}
          >
            {products.map(({ title, _id }) => (
              <option title={title.ru} key={_id} value={_id}>
                {title.ru}
              </option>
            ))}
          </Select>
        )}
      </Box>
    </>
  );
}
