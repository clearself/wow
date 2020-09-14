export default {
	state: {
		data: [],
		teamData:[]
	},
	mutations: {
		refreshData(state, {
			data
		}) {
			return state.data = data;
		},
		teamData(state, {
			data
		}) {
			if(data.first){
				return state.teamData = data.data;
			}else{
				return state.teamData.push(data);
			}
			
		}
	},
	actions: {
		getRefresh(store, {
			data
		}) {
			store.commit('refreshData', {
				data
			});
		},
		getTeam(store, {
			data
		}) {
			store.commit('teamData', {
				data
			});
		}
	},
	getters: {
		//		r5(state){
		//			var r = [
		//					{selectGroup:state.data[0].left.isSelected === true ? state.data[0].left : state.data[0].right}
		//				];

		//console.log(JSON.stringify(r));
		//return r;
		//}
	}
}