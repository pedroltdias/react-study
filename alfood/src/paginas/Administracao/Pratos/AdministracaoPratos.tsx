import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import http from '../../../http';
import IPrato from '../../../interfaces/IPrato';

export default function AdministracaoPratos() {
	const [pratos, setPratos] = useState<IPrato[]>([]);

	useEffect(() => {
		http.get<IPrato[]>("pratos/")
			.then(resposta => setPratos(resposta.data))
	}, []);

	function excluir(pratoAhSerExcluido: IPrato) {
		http.delete<IPrato>(`pratos/${pratoAhSerExcluido.id}/`)
			.then(() => {
				const listaPrato = pratos.filter(prato => prato.id !== pratoAhSerExcluido.id)
				setPratos([...listaPrato])
			});
	}

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>
							Nome
						</TableCell>
						<TableCell>
							Tag
						</TableCell>
						<TableCell>
							Imagem
						</TableCell>
						<TableCell>
							Editar
						</TableCell>
						<TableCell>
							Excluir
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{pratos.map(prato =>
						<TableRow key={prato.id}>
							<TableCell>
								{prato.nome}
							</TableCell>
							<TableCell>
								{prato.tag}
							</TableCell>
							<TableCell>
								[<a href={prato.imagem} target="_blank" rel="noreferrer">ver imagem</a>]
							</TableCell>
							<TableCell>
								[ <Link to={`/admin/prato/${prato.id}`}>Editar</Link> ]
							</TableCell>
							<TableCell>
								<Button
									variant="outlined"
									color="error"
									onClick={() => excluir(prato)}>
									Excluir
								</Button>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}