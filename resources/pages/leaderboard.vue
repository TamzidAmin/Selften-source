<template>
<v-layout column justify-center align-center width="100%">
    <template width="100%">
        <img :src="'https://admin.selften.com/uploads/leaderboard/'+leaderbordinfo[0].banner" alt="" style="object-fit: cover;width: 100%;max-height: 50vh;    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);;border: 2px solid;">
        <br>
        <div class="v-data-table v-data-table--fixed-height theme--light box-shodow" style="min-width: 350px;">
            <vue-scroll>
                <div style="height: 523px;">
                	<div class="box">
			            <div class="text-center w-33 pointer radious" :class="active=='players' ? 'active' : '' " @click="change('players')">Players</div>
			            <div class="text-center w-33 pointer radious" :class="active=='prizes' ? 'active' : '' " @click="change('prizes')">Prizes</div>
			            <div class="text-center w-33 pointer radious" :class="active=='rules' ? 'active' : '' " @click="change('rules')">Rules</div>
			        </div>
                    <table v-if="active=='players'">
                        <tbody>
                            <tr v-for="(item,index) in leaderboard">
                                <th class="text-left">
                                    <span style="font-size: 18px;">
                                        <span v-if="index+1==1">
                                            <img src="~/assets/l1.svg" alt="" style="height:30px;width:30px;margin-left: -8px;">
                                        </span>
                                        <span v-else-if="index+1==2">
                                            <img src="~/assets/l2.svg" alt="" style="height:30px;width:30px;margin-left: -8px;">
                                        </span>
                                        <span v-else-if="index+1==3">
                                            <img src="~/assets/l3.svg" alt="" style="height:30px;width:30px;margin-left: -8px;">
                                        </span>
                                        <span v-else>
                                            {{ index+1 }}
                                        </span>
                                    </span>
                                </th>
                                <th class="text-left"><span style="font-size: 18px;" class="text-primary">{{ item.username }}</span></th>
                                <th class="text-left"><span style="font-size: 18px;">{{ item.leaderboard }}</span></th>
                            </tr>
                        </tbody>
                    </table>
                    <div v-else-if="active=='prizes'">
				        <h2 class="text-primary pt-3 text-center">Weekly Competition</h2>
				        <div class="p-3 mt-2 text-center" v-if="leaderbordinfo[1]" v-html="leaderbordinfo[1].content">
				            
				        </div>
				    </div>
                    <div v-else-if="active=='rules'">
                        <h2 class="text-primary pt-3 text-center">Weekly Competition</h2>
                        <div class="p-3 mt-2 text-center" v-if="leaderbordinfo[2]" v-html="leaderbordinfo[2].content">
                            
                        </div>
                    </div>
                </div>
            </vue-scroll>
            <table v-if="authuser" style="background: black;display: none;">
                <tbody>
                    <tr>
                        <th class="text-left" width="20px"><span style="font-size: 18px;color: #fff">{{ 101 }}</span></th>
                        <th class="text-left" width="64%"><span style="font-size: 18px;" class="text-primary">{{ authuser.username }}</span></th>
                        <th class="text-left"><span style="font-size: 18px;color: #fff">{{ authuser.leaderboard }}</span></th>
                    </tr>
                </tbody>
            </table>
        </div>
    </template>
</v-layout>
</template>

<script>
import Carousels from '~/components/Carousels'
import Navmanu from '~/components/Navmanu'
import Card from '~/components/Card'
import axios from '~/plugins/axios'
import { mapMutations, mapGetters } from 'vuex'
export default {
    components:{
        Carousels,
        Card,
        Navmanu,
    },
    computed: mapGetters({
        authuser: 'authuser',
        base_url:'base_url'
    }),
    data () {
        return {
            leaderboard:[],
            active:'players',
            leaderbordinfo:[]
        }
    },
    methods:{
    	change(d){
    		this.active=d;
    	}
    },
    async asyncData ({ params }) {
        let { data } = await axios.get(`/api/leaderboard/`)
        let  leaderbordinfo = await axios.get(`/api/leaderbordinfo/`)
        return { 
            leaderboard: data,
            leaderbordinfo: leaderbordinfo.data,
        }
    }
}
</script>
