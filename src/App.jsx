/*
TODO remove bootstrap and replace with MUI.
*/

import { useState, useRef } from "react";
import {
  Container,
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Divider,
} from "@mui/material";
import QuotationTable from "./QuotationTable";
import products from "./products.json";

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price);

  const addItem = () => {
    let item = products.find((v) => itemRef.current.value === v.code);

    const newItem = {
      item: item.name,
      ppu: Number(ppuRef.current.value),
      qty: Number(qtyRef.current.value),
      discount: Number(discountRef.current.value),
    };
    console.log(typeof newItem.discount);
    const merged = Object.values(
      [...dataItems, newItem].reduce((acc, curr) => {
        const key = `${curr.item}_${curr.ppu}`; // group by name and price

        if (!acc[key]) {
          acc[key] = { ...curr };
        } else {
          acc[key].qty += curr.qty;
          acc[key].discount += curr.discount;
        }

        return acc;
      }, {})
    );
    setDataItems(merged);
  };

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  };

  const deleteAll = () => {
    setDataItems([]);
  };

  const productChange = () => {
    let item = products.find((v) => itemRef.current.value === v.code);
    setPpu(item.price);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item md={4} sx={{ backgroundColor: "#e4e4e4", padding: 2 }}>
          {/* Item Select */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="item-select-label">Item</InputLabel>
              <Select
                labelId="item-select-label"
                inputRef={itemRef}
                onChange={productChange}
                defaultValue="p001"
              >
                {products.map((p) => (
                  <MenuItem key={p.code} value={p.code}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Price Per Unit */}
          <Grid item xs={12} mt={2}>
            <TextField
              fullWidth
              label="Price Per Unit"
              type="number"
              inputRef={ppuRef}
              value={ppu}
              onChange={(e) => setPpu(ppuRef.current.value)}
            />
          </Grid>

          {/* Quantity */}
          <Grid item xs={12} mt={2}>
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              inputRef={qtyRef}
              defaultValue={1}
            />
          </Grid>

          {/* Discount */}
          <Grid item xs={12} mt={2}>
            <TextField
              fullWidth
              label="Discount"
              type="number"
              inputRef={discountRef}
              defaultValue={0}
            />
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* Add Button */}
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={addItem}
            >
              Add
            </Button>
          </Grid>
        </Grid>

        {/* Quotation Table */}
        <Grid item md={8}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            deleteAll={deleteAll}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
