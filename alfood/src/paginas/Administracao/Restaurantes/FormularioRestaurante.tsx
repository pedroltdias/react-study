import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function FormularioRestaurante() {
	const parametros = useParams();

	useEffect(() => {
		if (parametros.id) {
			axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
				.then(resposta => setNomeRestaurante(resposta.data.nome));
		}
	}, [parametros]);

	const [nomeRestaurante, setNomeRestaurante] = useState("");

	const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault();

		if (parametros.id) {
			axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
				nome: nomeRestaurante
			})
				.then(() => {
					alert("Restaurante ATUALIZADO com sucesso")
				})
		} else {
			axios.post("http://localhost:8000/api/v2/restaurantes/", {
				nome: nomeRestaurante
			})
				.then(() => {
					alert("Restaurante CADASTRADO com sucesso")
				})
		}

	}

	return (
		<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
			<Box component="form" onSubmit={aoSubmeterForm}>
				<TextField
					value={nomeRestaurante}
					onChange={evento => setNomeRestaurante(evento.target.value)}
					id="standard-basic"
					label="Nome do Restaurante"
					variant="standard"
					fullWidth
					required
				/>
				<Button
					sx={{ marginTop: 1 }}
					type="submit"
					variant="outlined"
					fullWidth
				>Salvar</Button>
			</Box>
		</Box>
	);
}