# **Ritematch: Innovative Job Matching Portal**

**Ritematch** is a full-stack application designed to intelligently match user skills with job requirements using NLP-based cosine similarity. The project includes a Django backend for data processing and APIs, and a React frontend for a seamless user interface.

## **Features**
- **Backend**:
  - User authentication (signup/signin).
  - Job retrieval and scoring via Rest APIs.
  - Intelligent job matching using NLP cosine similarity.
- **Frontend**:
  - User-friendly interface for interacting with job listings.
  - “Check My Job Score” feature to display personalized job matches.
- **Deployment**:
  - Backend hosted on a Django server.
  - Frontend hosted using Firebase.

---

## **Installation Guide**

### **Clone the Repository**
```bash
git clone https://github.com/your-username/RiteMatch.git
cd RiteMatch
```

### **Setup Backend**
1. **Navigate to Backend Directory:**
   ```bash
   cd backend
   ```
2. **Create Virtual Environment:**

    ```bash
    python -m venv venv
    ```

3. **Activate Virtual Environment:**

    - *On Windows:*
      ```bash
      venv\Scripts\activate
      ```
    - *On Linux/macOS:*
      ```bash
      source venv/bin/activate
      ```

4. **Install Dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

5. **Apply Migrations:**

    ```bash
    python manage.py migrate
    ```

6. **Run the Server:**

    ```bash
    python manage.py runserver
    ```

Now, you can access the RiteMatch at [http://localhost:8000/](http://localhost:8000/) in your web browser.

## Usage

- **Job Retrieval API:**
  - **Endpoint:** `/jobs/`
  - **Description:** Retrieves available jobs from the portal.

- **Job Score API:**
  - **Endpoint:** `/match/skills/`
  - **Description:** Provides a score for each job.
    
- **User Signup API:**
  - **Endpoint:** `/user/signup/`
  - **Description:** Handles user registration.

- **User Signin API:**
  - **Endpoint:** `/user/signin/`
  - **Description:** Handles user login.

- **Admin Interface:**
  - **Endpoint:** `/admin/`
  - **Description:** Access the Django admin interface for adding/removing superusers.
