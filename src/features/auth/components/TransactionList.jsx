import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Chip,
  Pagination,
  Grid
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { transactionService } from "../services/transactionService";
import TransactionForm from "./TransactionForm";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    search: "",
    startDate: "",
    endDate: "",
    page: 1,
    limit: 10
  });
  const [totalPages, setTotalPages] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const response = await transactionService.getAll(filters);
      setTransactions(response.transactions);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error cargando transacciones:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [filters]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value, page: 1 }));
  };

  const handlePageChange = (event, value) => {
    setFilters(prev => ({ ...prev, page: value }));
  };

  const handleCreate = () => {
    setEditingTransaction(null);
    setOpenForm(true);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta transacción?")) {
      try {
        await transactionService.delete(id);
        loadTransactions();
      } catch (error) {
        console.error("Error eliminando transacción:", error);
      }
    }
  };

  const handleFormClose = () => {
    setOpenForm(false);
    loadTransactions();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Transacciones
      </Typography>

      {/* Filtros */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Tipo</InputLabel>
            <Select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="ingreso">Ingreso</MenuItem>
              <MenuItem value="gasto">Gasto</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Categoría"
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Buscar"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            placeholder="Descripción o categoría"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreate}
            fullWidth
          >
            Nueva Transacción
          </Button>
        </Grid>
      </Grid>

      {/* Tabla */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell align="right">Monto</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">Cargando...</TableCell>
              </TableRow>
            ) : transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">No hay transacciones</TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.type === "ingreso" ? "Ingreso" : "Gasto"}
                      color={transaction.type === "ingreso" ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell align="right">
                    <Typography
                      color={transaction.type === "ingreso" ? "green" : "red"}
                      fontWeight="bold"
                    >
                      {transaction.type === "ingreso" ? "+" : "-"}{formatCurrency(transaction.amount)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(transaction)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(transaction._id)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginación */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={filters.page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      {/* Formulario Modal */}
      <Dialog open={openForm} onClose={handleFormClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingTransaction ? "Editar Transacción" : "Nueva Transacción"}
        </DialogTitle>
        <DialogContent>
          <TransactionForm
            transaction={editingTransaction}
            onClose={handleFormClose}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TransactionList;