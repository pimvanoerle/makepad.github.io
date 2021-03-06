new require('styles/dark')

module.exports = class extends require('base/app'){

	prototype(){
		this.tools = {
			Tabs: require('views/tabs').extend({
			}),
			Splitter:require('views/splitter').extend({
			}),
			Button: require('stamps/button').extend({
			}),
			Dock:require('views/dock').extend({
				tools:{
					View:require('views/draw').extend({
						xOverflow:'none',
						tools:{
							Button:require('stamps/button'),
							Thing:require('shaders/bg')
						},
						onDraw(){
							this.beginQuad({color:'#4',w:'100%'})
							for(var i =0; i < 300; i++){
								this.drawButton({id:i,icon:'search'})
								this.drawBg2({margin:2,color:[sin(i),sin(i),sin(i),1],w:25,h:25, borderRadius:this.br})
							}
							this.endQuad()
							/*
							var A = this.drawBg.toString()
							var B = this.drawBg2.toString().replace(/Bg2/g,'Bg')
							let s,e1,e2
							for(s = 0; A.charAt(s) === B.charAt(s);s++);
							for(e1 = A.length-1, e2 = B.length-1; A.charAt(e1) === B.charAt(e2);e1--,e2--);
							//console.log(A.slice(s,e1)+'\n-------\n'+B.slice(s,e2))
						*/
						}
					})
				},
			})
		}
	}

	constructor(){
		super()

		this.dock = new this.Dock(this, {
			w:'100%',
			h:'100%',
			deserializeView(node){
				let type = node.type
				if(type === 'Test') return new this.View(this,{
					id:'View'+node.title,
					tabTitle:node.title,
					br:8*random(),
					w:'100%',
					h:'100%'
				})
			},
			data: {
				locked:true,
				position:200,
				vertical: false,
				pane1:{
					selected:1,
					tabs:[
						{type:'Test', title:'1'},
						{type:'Test', title:'2'},
						{type:'Test', title:'3'}
					]
				},
				pane2:{
					selected:0,
					tabs:[
						{type:'Test', title:'A'}
					]
				}
			}
		})
	}

	onDraw(){
		//this.drawButton({id:2,text:'hi'})
		//this.tabs.draw(this)
		this.dock.draw(this)
		//this.drawTabs({id:1,w:'100%',h:'100%',tabs:[this.myView,this.myView,this.myView,this.myView]})
	}
}
