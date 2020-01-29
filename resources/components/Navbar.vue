<template>
	<v-card
		color="grey lighten-4"
		flat
		height="200px"
		tile
	>
		<v-toolbar dense>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />

			<v-toolbar-title><v-toolbar-title><img src="~/assets/selften.png" alt="" width="100%"></v-toolbar-title></v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn icon>
				<v-icon>mdi-magnify</v-icon>
			</v-btn>

			<v-btn icon>
				<v-icon>mdi-heart</v-icon>
			</v-btn>

			<v-btn icon>
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>
		</v-toolbar>
	</v-card>
</template>