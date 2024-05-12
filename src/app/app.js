import './app.css';
import React from 'react';
import ListItem from '../list-item';
import defaultImage from '../images/image.jpeg';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const [allRecipesData, setAllRecipesData] = useState(null);
  let [currentPage, setCurrentPage] = useState(1);
  const [cusineArr, setCuisineArr] = useState(null);
  const [mealTypeArr, setMealTypeArr] = useState(null);
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [selectedMealType, setSelectedMealType] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('any');
  const [filteredRecipesData, setFilteredRecipesData] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  let [filteredRecipesLength, setFilteredRecipesLength] = useState(0);

  const recipesPerPage = 6;

  useEffect(() => {
    getAllRecipes();
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [allRecipesData, selectedCuisine, selectedMealType, selectedDifficulty, currentPage]);



  async function getAllRecipes() {
    const response = await fetch('https://dummyjson.com/recipes?total=100&skip=0&limit=100');
    const data = await response.json();
    console.log(data.recipes);
    setAllRecipesData(data.recipes);
    const uniqueCuisines = [...new Set(data.recipes.map(recipe => recipe.cuisine))];
    const uniqueMealTypes = [...new Set(data.recipes.map(recipe => recipe.mealType).flat())];
    setCuisineArr(uniqueCuisines);
    setMealTypeArr(uniqueMealTypes);
  }

  function filterRecipes() {
    if (allRecipesData) {
      let filteredRecipes = allRecipesData;
      if (selectedCuisine !== 'all') {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.cuisine === selectedCuisine);
      }
      if (selectedMealType !== 'all') {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.mealType.includes(selectedMealType));
      }
      if (selectedDifficulty !== 'any') {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.difficulty === selectedDifficulty);
      }
      let counter = filteredRecipes.length;
      const startIndex = (currentPage - 1) * recipesPerPage;
      const endIndex = startIndex + recipesPerPage;
      const recipesOnCurrentPage = filteredRecipes.slice(startIndex, endIndex);
      setFilteredRecipesData(recipesOnCurrentPage);

      const newTotalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
      setTotalPages(newTotalPages);
      setCurrentPage(prevPage => Math.min(prevPage, newTotalPages));
      setFilteredRecipesLength(counter);
    }
  }

  return (
    <div className="app">
      <header>
        <h1>Сборник рецептов из разных стран мира</h1>
      </header>
      <section>
        <div className="filter-area">
          <div className="filter-area-content">
            <div style={{ backgroundImage: `url(${defaultImage})` }}></div>
            <p>В нашей жизни, когда время становится все более ценным ресурсом, задача планирования приема пищи становится все более сложной.<br /><br />
              Часто мы сталкиваемся с дилеммой: что приготовить на завтрак, обед или ужин? Каким образом мы можем легко и быстро определиться с выбором блюда и не тратить много времени на принятие этого решения?<br /><br />
              Наш сервис поможет: выбирайте параметры - и вперед!</p>
          </div>
          <div className="filters">
            <div className="select-filter">
              <p>Кухня:</p>
              <select value={selectedCuisine} onChange={(e) => setSelectedCuisine(e.target.value)}>
                <option key="all" value="all">Все страны и регионы</option>
                {cusineArr && cusineArr.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div className="select-filter">
              <p>Тип блюда:</p>
              <select value={selectedMealType} onChange={(e) => setSelectedMealType(e.target.value)}>
                <option value="all">Все типы</option>
                {mealTypeArr && mealTypeArr.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div className="select-filter">
              <p>Сложность приготовления:</p>
              <div>
                <div className={selectedDifficulty === 'any' ? 'active-filter' : ''} onClick={(e) => setSelectedDifficulty('any')}><p>Любая</p></div>
                <div className={selectedDifficulty === 'Easy' ? 'active-filter' : ''} onClick={(e) => setSelectedDifficulty('Easy')}><p>Низкая</p></div>
                <div className={selectedDifficulty === 'Medium' ? 'active-filter' : ''} onClick={(e) => setSelectedDifficulty('Medium')}><p>Средняя</p></div>
                <div className="filter-not-found"><p>Высокая</p></div>
              </div>
            </div>
            <p>Сбросить все фильтры</p>
          </div>
          <div className="random-recipe">
            <h5>А еще можно попробовать на вкус удачу</h5>
            <Link to={`/recipe/${Math.floor(Math.random() * 50)}`}>
            <button>Мне повезёт!</button>
            </Link>
          </div>
        </div>
        <div className="list-area">
          <header>
            <h2>Найденные рецепты</h2>
            <p>{filteredRecipesLength}</p>
          </header>
          <div className="recipe-list">
            {filteredRecipesData && filteredRecipesData.map(item =>
              <Link key={item.id} to={`/recipe/${item.id}`} className="list-item-link">
                <ListItem 
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  instructions={item.instructions}
                  time={item.cookTimeMinutes + item.prepTimeMinutes}
                  difficulty={item.difficulty}
                  cuisine={item.cuisine}
                  mealType={item.mealType} />
              </Link>
            )}
          </div>
          <div className="pagination">
            <button onClick={() => setCurrentPage(currentPage - 1)} className={currentPage === 1 ? 'disabled' : ''}>{'<'}</button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button key={index} onClick={() => setCurrentPage(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>{index + 1}</button>
            ))}
            <button onClick={() => setCurrentPage(currentPage + 1)} className={currentPage === totalPages ? 'disabled' : ''}>{'>'}</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
