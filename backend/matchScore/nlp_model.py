import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def process_skills(user_skills):
    # Loading the data
    data = pd.read_csv('Cleaned_Jobs_Final.csv')  # Replace with the path to your CSV

    # Splitting the user input into individual skills and converting to lowercase
    skills_list = [skill.lower() for skill in user_skills]

    # Combining user skills with job descriptions for vectorization
    combined_texts = data['cleaned_description'].tolist() + skills_list

    # Vectorization using TF-IDFs
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(combined_texts)

    # Calculating the cosine similarity
    job_similarity_scores = []
    for i in range(len(data)):
        job_scores = cosine_similarity(tfidf_matrix[i], tfidf_matrix[-len(skills_list):])
        aggregated_score = job_scores.sum()  # Summing the scores for each skill
        job_similarity_scores.append(aggregated_score)

    # Normalize the scores to convert them into percentages
    max_score = max(job_similarity_scores)
    # normalized_scores = [(score / max_score) * 100 for score in job_similarity_scores]
    normalized_scores = [round((score / max_score) * 100, 2) for score in job_similarity_scores]

    # Creating a DataFrame for normalized similarity scores
    similarity_scores = pd.DataFrame(normalized_scores, columns=['eligibility_percentage'])

    # Combining scores with the original data
    result = pd.concat([data, similarity_scores], axis=1)

    result.fillna(value={'eligibility_percentage': 0}, inplace=True)  # Example: setting NaN eligibility percentages to 0

    result.dropna(inplace=True)

    # Sorting by similarity score in descending order
    sorted_result = result.sort_values(by='eligibility_percentage', ascending=False)

    # Select relevant information to return
    top_matches = sorted_result[['title', 'company', 'job_url', 'location', 'eligibility_percentage']].to_dict(orient='records')

    return top_matches
