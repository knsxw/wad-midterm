/*
TODO remove bootstrap and replace with MUI.
*/

import { CiShoppingCart } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function QuotationTable({ data, deleteByIndex, deleteAll }) {
  // Guard condition
  if (!data || data.length === 0) {
    return (
      <Container>
        <h1>Quotation</h1>
        <p>
          <CiShoppingCart /> No items
        </p>
      </Container>
    );
  }

  const total = data.reduce((acc, v) => acc + v.qty * v.ppu, 0);
  const totalDiscount = data.reduce((acc, v) => acc + v.discount, 0);

  const handleDelete = (index) => {
    deleteByIndex(index);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Quotation
      </Typography>

      <Button
        variant="outlined"
        color="inherit"
        startIcon={<MdClear />}
        onClick={deleteAll}
        sx={{ mb: 2 }}
      >
        Clear
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">-</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="center">Item</TableCell>
              <TableCell align="center">Price/Unit</TableCell>
              <TableCell align="right">Discount</TableCell>
              <TableCell align="center">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((v, i) => {
              const amount = v.qty * v.ppu - v.discount;
              return (
                <TableRow key={i}>
                  <TableCell align="center">
                    <BsFillTrashFill
                      onClick={() => handleDelete(i)}
                      style={{ cursor: "pointer" }}
                    />
                  </TableCell>
                  <TableCell align="center">{v.qty}</TableCell>
                  <TableCell align="center">{v.item}</TableCell>
                  <TableCell align="center">{v.ppu}</TableCell>
                  <TableCell align="right">{v.discount}</TableCell>
                  <TableCell align="right">{amount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} align="right" sx={{ fontWeight: "bold" }}>
                Total Discount
              </TableCell>
              <TableCell align="right">{totalDiscount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} align="right" sx={{ fontWeight: "bold" }}>
                Total
              </TableCell>
              <TableCell align="right">{total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default QuotationTable;
