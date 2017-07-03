import React, { Component } from 'react';
import './timeline.css';

export default class Timeline extends Component {


constructor(){
	super()
	this.state ={
	scrollPosition: 0
}	
this.scroll=this.scroll.bind(this)	
}




	scroll(e) {
		var target =this.refs.timeLineContainer;

		if (target) {
		// console.log(target.scrollWidth)
		this.setState({scrollPosition: this.state.scrollPosition + e.deltaY})
		if( this.state.scrollPosition < 0 ){
			this.setState({scrollPosition:0})
		}
		if( this.state.scrollPosition > target.scrollWidth ){
			this.setState({scrollPosition: target.scrollWidth})
		}
		target.scrollLeft = this.state.scrollPosition
		}


	}


componentDidMount(){
	if(this.props.location.pathname === "/timeline"){

	window.onwheel = this.scroll
// 	console.log(window.location);

// console.log(this.props.location.pathname);
	};
}




render() {
    return (
<div className="timeline-body">

<div id="cd-timeline" className="cd-container" ref='timeLineContainer'>
	
	
	<div className="timeLineContainer" >
		<div className="yearTextContainer">
					<div className="timeLineTime">1830</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1831</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1832</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1833</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1834</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1835</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1836</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1837</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1838</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1839</div>
					<div className="timeLineEvent">Soda was Invented</div>
			</div>

			<div className="yearTextContainer">
					<div className="timeLineTime">1840</div>
			</div>
			
		<div className="yearTextContainer">
					<div className="timeLineTime">1841</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1842</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1843</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1844</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1845</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1846</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1847</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1848</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1849</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1850</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1851</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1852</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1853</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1854</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1855</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1856</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1857</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1858</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1859</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1860</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1861</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1862</div>
					<div className="timeLineEvent">President Lincoln founds the USDA</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1863</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1864</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1865</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1866</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1867</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1868</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1869</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1870</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1871</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1872</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1873</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1874</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1875</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1876</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1877</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1878</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1879</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1880</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1881</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1882</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1883</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1884</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1885</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1886</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1887</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1888</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1889</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1890</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1891</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1892</div>
					<div className="timeLineEvent">Coca-Cola is founded</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1893</div>
					<div className="timeLineEvent">USDA begins to fund research on nutrition</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1894</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1895</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1896</div>
					<div className="timeLineEvent">Americans advised to eat more</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1897</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1898</div>
					<div className="timeLineEvent">Pepsi is founded</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1899</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1900</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1901</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1902</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1903</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1904</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1905</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1906</div>
					<div className="timeLineEvent">The Pure Food and Drug Act is passed.</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1907</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1908</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1909</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1910</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1911</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1912</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1913</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1914</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1915</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1916</div>
					<div className="timeLineEvent">First, self-service grocery store, Piggly Wiggly is founded in Memphis,TN</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1917</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1918</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1919</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1920</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1921</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1922</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1923</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1924</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1925</div>
					<div className="timeLineEvent">Lucky Strike Cigarettes launches ad campaign aimed at using nicotine to supress hunger.</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1926</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1927</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1928</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1929</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1930</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1931</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1932</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1933</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1934</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1935</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1936</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1937</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1938</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1939</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1940</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1941</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1942</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1943</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1944</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1945</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1946</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1947</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1948</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1949</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1950</div>
					<div className="timeLineEvent">JFK publishes article imporing Americans to increase their level of fitness.</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1951</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1952</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1953</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1954</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1955</div>
					<div className="timeLineEvent">McDonald's is founded</div>
			</div>
		<div className="yearTextContainer">
					<div className="timeLineTime">1956</div>
					
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1957</div>
					<div className="timeLineEvent">Research finds that heart disease goes hand in hand with diet and exercise</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1958</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1959</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1960</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1961</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1962</div>
					<div className="timeLineEvent">U.S has 13% obesity rate; 45% of Americans were overweight</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1963</div>
					<div className="timeLineEvent">Weight Watchers is founded</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1964</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1965</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1966</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1967</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1968</div>
					<div className="timeLineEvent">Big Mac is introduced at McDonald's</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1969</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1970</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1971</div>
					<div className="timeLineEvent">1971 StarBucks is founded.</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1972</div>
					<div className="timeLineEvent">Dr.Atkin's publishes diet</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1973</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1974</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1975</div>
					<div className="timeLineEvent">Sodas make up about 4% of daily calorie intake</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1976</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1977</div>
					<div className="timeLineEvent">Slim Fast becomes a diet staple.</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1978</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1979</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1980</div>
					<div className="timeLineEvent">America'Obesity epidemic begins.</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1981</div>
					<div className="timeLineEvent">USDA says ketchup could be considered a vegetable in school lunches.</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1982</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1983</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1984</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1985</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1986</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1987</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1988</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1989</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1990</div>
					<div className="timeLineEvent">20-ounce soda bottles become the norm</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1991</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1992</div>
					<div className="timeLineEvent">USDA publishes food pyramid</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1993</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1994</div>
					<div className="timeLineEvent">Guide to Nutrition Labeling and Education Act Requires food companies to include nutritional info on packaging.</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1995</div>
					<div className="timeLineEvent">American consumption of fast food establisments triples.</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1996</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1997</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1998</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">1999</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">2000</div>
					<div className="timeLineEvent">Each individual consumed over 150 pounds of sugar. </div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">2001</div>
					<div className="timeLineEvent">Soda makes up 9% of daily calorie intake</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">2002</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">2003</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">2004</div>
					<div className="timeLineEvent">American Obesity rate reaches critical levels at 45%</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">2005</div>
					<div className="timeLineEvent">USDA replaces food pyramid with MyPyramid</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">2006</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">2007</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">2008</div>
					<div className="timeLineEvent">Estimated annual medical cost obesity in Americans was $147 billion. Medical costs for $14,29 higher than those of normal weight.</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">2009</div>
					<div className="timeLineEvent">More than half the cancers were attributed to high-fat diets</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">2010</div>
					<div className="timeLineEvent">Colorado is the only state that had an obesity rate of less than 20%</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">2011</div>
					<div className="timeLineEvent">MyPlate replaces MyPyramid</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">2012</div>
					<div className="timeLineEvent">Average American ate more than 200 meals outside the home.</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">2013</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">2014</div>
					<div className="timeLineEvent">Two in Three Americans are overweight or obese</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">2015</div>
					<div className="timeLineEvent">Spending at restaurants and bars overtook grocery purchases.</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">2016</div>
					<div className="timeLineEvent">Typical American diet is 50% carbs, 15% protein, and 35% fat</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">2017</div>
					<div className="timeLineEvent">Americans consume more than 500 calories a day then they did in the 60s</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">2018</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">2019</div>
			</div>
			<div className="yearTextContainer">
					<div className="timeLineTime">2020</div>
			</div>
		
		</div>
		
		</div>
	</div>


)}}
