import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
const Demo = () => {
	const [article, setArticle] = useState({
		url: "",
		summary: "",
	});

	const [allArticles, setAllArticles] = useState([]);

	const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const [copied, setCopied] = useState('')

	useEffect(() => {
		const articlesFormLS = JSON.parse(localStorage.getItem("articles"));

		if (articlesFormLS) {
			setAllArticles(articlesFormLS);
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { data } = await getSummary({ articleUrl: article.url });
		if (data?.summary) {
			const newArticle = { ...article, summary: data.summary };

			const updatedAllArticles = [newArticle, ...allArticles];
			setAllArticles(updatedAllArticles);
			setArticle(newArticle);

			localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
		}
	};

  const handleCopyOpiton = (copyUrl) => {
    setCopied(copyUrl)
    navigator.clipboard.writeText(copyUrl)
    setTimeout(() => setCopied(false), 3000)
  }

	return (
		<section className="mt-16 w-full max-w-xl ">
			<div className="flex flex-col w-full gap-2">
				<form
					className="relative flex justify-center items-center gap-2"
					onSubmit={handleSubmit}
				>
					<img
						src={linkIcon}
						className="absolute left-0 my-2 ml-3 w-5"
						alt="link_icon"
					/>
					<input
						type="url"
						placeholder="Введите URL ссылку"
						value={article.url}
						onChange={(e) => {
							setArticle({
								...article,
								url: e.target.value,
							});
						}}
						required
						className="url_input peer"
					/>
					<button
						className="submit_btn peer-focus:border-blue-500 peer-focus:text-gray-700"
						type="submit"
					>
						⎆
					</button>
				</form>

				<div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
					{allArticles.map((item, i) => (
						<article
							key={`link-${i}`}
							className="link_card"
							onClick={() => setArticle(item)}
						>
							<div className="copy_btn">
                <img
                  src={copied === item.url ? tick : copy}
                  title="Copy Link"
                  onClick={() => handleCopyOpiton(item.url)}
                  alt="copy_icon"
                  className="w-[50%] h-[50%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-800 font-medium text-sm truncate">{item.url}</p>
						</article>
					))}
				</div>
			</div>

      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">Произошла ошибка. Повторите попытку позднее <br/> <span className="font-satoshi font-normal text-gray-700">{error?.data?.error}</span></p>
        ): (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span> 
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
		</section>
	);
};

export default Demo;
