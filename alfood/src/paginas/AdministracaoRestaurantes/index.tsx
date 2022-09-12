import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import axios from 'axios';

export default function AdministracaoRestaurantes() {
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

	useEffect(() => {
		axios.get<IRestaurante[]>("http://localhost:8000/api/v2/restaurantes/")
			.then(resposta => setRestaurantes(resposta.data))
	}, []);

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>
							Nome
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{restaurantes.map(restaurante =>
						<TableRow key={restaurante.id}>
							<TableCell>
								{restaurante.nome}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}