<template>
	<v-row justify="center">
		<v-btn
			color="primary"
			dark
			@click.stop="dialog = true"
			small
		>
			Register
		</v-btn>

		<v-dialog
			v-model="dialog"
			max-width="600"
		>
			<v-card>
				<form class="p-5" style="padding: 20px;">
				    <v-text-field
				      v-model="name"
				      label="Name"
				      required
				    ></v-text-field>
				    <v-text-field
				      v-model="email"
				      label="E-mail"
				      required
				    ></v-text-field>
				    <v-select
				      v-model="select"
				      :items="items"
				      label="Select"
				      data-vv-name="select"
				      required
				    ></v-select>
				    <v-checkbox
				      v-model="checkbox"
				      value="1"
				      label="Option"
				      data-vv-name="checkbox"
				      type="checkbox"
				      required
				    ></v-checkbox>

    <v-btn class="mr-4" @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
  export default {
    data: () => ({
    	dialog: false,
      name: '',
      email: '',
      select: null,

      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: null,
      dictionary: {
        attributes: {
          email: 'E-mail Address',
          // custom attributes
        },
        custom: {
          name: {
            required: () => 'Name can not be empty',
            max: 'The name field may not be greater than 10 characters',
            // custom messages
          },
          select: {
            required: 'Select field is required',
          },
        },
      },
    }),


    methods: {
      submit () {
        this.$validator.validateAll()
      },
      clear () {
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.$validator.reset()
      },
    },
  }
</script>