const projects = [
	{name: 'four-card-feature-section-master'},
	{name: 'fylo-dark-theme-landing-page-master'}
];

const list = document.getElementById('list');

projects.forEach(({name}, i) => {
	const listItem = document.createElement('li');

	listItem.innerHTML = `
		<a href="${name}/index.html">
			<img src="${name}/design/desktop-design.jpg" alt="${name}" />
			<p>${i + 1}. ${formatProjectName(name)}</p>
		</a>
		<div class="links-container">
			<a href="${name}/index.html" class="blue">
				<i class="fas fa-eye"></i>
			</a>
		</div>
	`;

	list.appendChild(listItem);
});

function formatProjectName(name) {
	return name
		.split('-')
		.map(word => word[0].toUpperCase() + word.slice(1))
		.join(' ');
}