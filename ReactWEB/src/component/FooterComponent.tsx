import {Paper, Stack} from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";

export default function FooterComponent() {
	return (
		<Paper elevation={3} sx={{ my: 2, px: 2, py:1 }}>
			<Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
				<Box gridColumn="span 6">
					<p>© { new Date().getFullYear() } - ExpressReactPokedex</p>
				</Box>

				<Box gridColumn="span 6">
					<p style={{ textAlign: "right" }}>Created by Pavel Mikula and Miroslav Osoba</p>
				</Box>
			</Box>
		</Paper>
	);
}