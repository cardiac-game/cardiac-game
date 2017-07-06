import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './nutrition.css';

export default class Nutrition extends Component {

  constructor() {
    super()

    this.state = {}
  }

  render() {
    return (

      <section className="nutrition-body">
        <div className="nutrition-back">
        <div className="nutrition-title">NUTRITION</div>
        <div className="nutrition-dark-curtain"></div>
        </div>
        <div className="nutri-container">
          <section>
            <div>
              <h3 className="nutrition-headers">Carbohydrates</h3>
              <li>Yields about four calories of energy per gram</li>
              <li>A common form of energy</li>
              <li>Found in a wide variety of foods, including cereals ( wheat, maize, rice), potatoes, table sugar, fruits, bread, etc.</li>
              <li>Should make up 25%-55% of daily caloric intake</li>
            </div>
            <div><br/>
              <h3 className="nutrition-headers">Protein</h3>
              <li>Yields about four calories of energy per gram</li>
              <li>Necessary for body growth and maintenance. Can be found in every cell in the body.</li>
              <li>Found in meat, products from milk, eggs, soy, fish, etc.</li>
              <li>Should make up 25%-35% of daily caloric intake</li>
            </div>
            <div><br/>
              <h3 className="nutrition-headers">Fats</h3>
              <li>Yields about nine calories of energy per gram</li>
              <li>Necessary for storing energy, sending signals, and as structural components of cell membranes</li>
              <li>Found in oils, certain cuts of meat, and nuts</li>
              <li>Should make up 20%-40% of daily caloric intake</li>
            </div><br/>
          </section>
          <hr />
          <section>
            <a></a>
            <div>
              <h3 className="nutrition-headers">Cholesterol</h3>
              <li>Necessary for building cells</li>
              <li>Cholesterol comes from two sources: when it is naturally produced by the body in the liver as well as and when food from animals is consumed</li>
              <li>There are two types of cholesterol, the bad cholesterol: low-density lipoproteins (LDL) and the good cholesterol high-density lipoproteins (HDL) which acts to clean up the LDL in found in the body.</li>
              <li>When too much cholesterol is in the body it starts to build up on the artery walls, narrowing the passageways. This can increase the risk for heart attack, stroke, and peripheral artery disease.</li>
              <li>Should consume a maximum of 300mg per day</li>
            </div>
            <div><br/>
              <h3 className="nutrition-headers">Fiber</h3>
              <li>Promotes a healthy digestive system and microbiome (the mixture of microbes found in the body)</li>
              <li>Composed of soluble fiber and insoluble fiber</li>
              <li>Soluble fiber, which dissolves in water, ferments in the colon, turning into gases and active byproducts. It can lead to an extended feeling of fullness.</li>
              <li>Insoluble fiber, which cannot dissolve in water, is metabolically inert, providing no nutrients and no reaction in the body. Provide regulation of the digestive system as it passes through.</li>
              <li>Should consume 30g per day</li>
            </div>
            <div><br/>
              <h3 className="nutrition-headers">Sodium</h3>
              <li>Necessary for muscle and nerve function and the regulation of blood pressure and blood volume.</li>
              <li>Too much sodium can lead to high blood pressure</li>
              <li>Roughly 75% of the sodium in our diets is added by manufacturers.</li>
              <li>Should consume a maximum of 2300mg per day</li>
            </div><br/>
          </section>
          <div className="nutirtion-banner"></div>
          <section>
            <div><br/>
              <h3 className="nutrition-v-and-m">Vitamins and Minerals</h3><hr />
              <h3 className="nutrition-headers">Calcium</h3>
              <li>Required for vascular contraction and dilation, muscle function, nerve transmission, intercellular signaling and hormonal secretion</li>
              <li>Found in Milk, yogurt, cheese, kale and broccoli</li>
              <li>Should consume 1000mg per day</li>
            </div>
            <div><br/>
              <h3 className="nutrition-headers">Folate</h3>
              <li>Required for cell division and the metabolism of amino acids</li>
              <li>Found in dark green leafy vegetables, fruits, nuts, beans, dairy products, meats, and grains</li>
              <li>Should consume 400mcg per day</li>
            </div>
            <div><br/>
              <h3 className="nutrition-headers">Iron</h3>
              <li>An essential component of hemoglobin, the protein on red blood cells which transfers oxygen from the lungs to the tissues</li>
              <li>Necessary for growth, development, normal cellular functioning, and synthesis of some hormones and connective tissue.</li>
              <li>Found in lean meat and seafood, nuts, beans, vegetables, and fortified grain products</li>
              <li>Should consume 18mg per day</li>
            </div>
            <div><br/>
              <h3 className="nutrition-headers">Magnesium</h3>
              <li>A factor in protein synthesis, muscle and nerve function, blood glucose control, and blood pressure regulation</li>
              <li>Found in green leafy vegetables, nuts, seeds, and whole grains</li>
              <li>Should consume 400mg per day</li>
            </div>
            <div><br/>
              <h3 className="nutrition-headers">Niacin</h3>
              <li>Helps the digestive system, skin, and nerves to function</li>
              <li>Found in milk, eggs, fish, lean meats, enriched breads and cereals</li>
              <li>Should consume 9mg per day</li>
            </div>
            <div><br/>
              <h3 className="nutrition-headers">Potassium</h3>
              <li>Necessary for building muscle, metabolizing carbohydrates, control the electrical activity of the heart, and build proteins</li>
              <li>Found in all meats, soy products, broccoli, sweet potatoes, citrus fruits, bananas, and milk</li>
              <li>Should consume 5000mg per day</li>
            </div>
            <div><br/>
              <h3 className="nutrition-headers">Riboflavin</h3>
              <li>Plays a critical role in energy metabolism and therefore, in the growth, development, and function of cells</li>
              <li>Found in eggs, lean meats, organ meats (kidneys and liver), milk, green vegetables, and grains</li>
              <li>Should consume 1.5mg per day</li>
            </div>
            <div><br/>
              <h3 className="nutrition-headers">Thiamin</h3>
              <li>Plays a critical role in energy metabolism and therefore, in the growth, development, and function of cells</li>
              <li>Found in whole grains, meat, fish, breads, and cereals</li>
              <li>Should consume 1.5mg per day</li>
            </div>
            <div><br/>
              <h3 className="nutrition-headers">Vitamin A</h3>
              <li>Involved in immune function, vision, reproduction and cellular communication.</li>
              <li>Found in milk, eggs, liver, fish, leafy green vegetables, fortified cereals and fruits.</li>
              <li>Should consume 5000IU per day</li>
            </div>
            <div><br/>
              <h3 className="nutrition-headers">Vitamin B-6</h3>
              <li>Necessary for more than 100 enzyme reactions involved in metabolism</li>
              <li>Found in poultry, fish, organ meats, potatoes, and fruit</li>
              <li>Should consume 2mg per day</li>
            </div>
            <div><br/>
              <h3 className="nutrition-headers">Vitamin B-12</h3>
              <li>Necessary for red blood cell formation, neurological function, and DNA synthesis which is necessary in all cells</li>
              <li>Found in animal products and fortified breakfast cereals</li>
              <li>Should consume 6mg per day</li>
            </div>
            <div><br/>
              <h3 className="nutrition-headers">Vitamin C</h3>
              <li>Humans are unable to make our own Vitamin C, so it is a necessary dietary component</li>
              <li>Necessary for collagen production, the immune system, and protecting the body from free radicals</li>
              <li>Found in citrus fruits, broccoli, red and green pepper and kiwifruit</li>
              <li>Should consume 60mg per day</li>
            </div>
            <div><br/>
              <h3 className="nutrition-headers">Vitamin D</h3>
              <li>Promotes calcium absorption and is necessary for bone growth, bone remodeling, muscle contraction, nerve transmission, and for the immune system</li>
              <li>Found in fatty fish, mushrooms, fortified milk, cheese, and egg yolks</li>
              <li>Should consume 400IU per day</li>
            </div>
            <div><br/>
              <h3 className="nutrition-headers">Vitamin E</h3>
              <li>Boosts the immune system and helps to widen blood vessels and keep blood from clotting within them</li>
              <li>Found in vegetable oils, nuts, green vegetables, and some fortified foods</li>
              <li>Should consume 30IU per day</li>
            </div>
            <div><br/>
              <h3 className="nutrition-headers">Vitamin K</h3>
              <li>Important for blood clotting and healthy bones</li>
              <li>Found in green leafy vegetables, vegetable oils, blueberries, figs, meats, cheese, eggs, and soybeans</li>
              <li>Should consume 78mcg per day</li>
            </div>
            <div><br/>
              <h3 className="nutrition-headers">Zinc</h3>
              <li>Plays a role in immune function, protein synthesis, wound healing, DNA synthesis, and cell division.</li>
              <li>Found in oysters, red meat, poultry, beans, nuts, and dairy products</li>
              <li>Should consume 15mg per day</li>
            </div>
          </section>

        </div>
      </section>
    )
  }
}
