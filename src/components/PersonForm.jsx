const PersonForm = ({ newName, newNumber, addContact, handleNewName, handleNewNumber }) => {
    return (
        <form onSubmit={addContact}>
            <div>
                name: <input
                    value={newName}
                    onChange={handleNewName}
                />
            </div>
            <div>
                number: <input
                    value={newNumber}
                    onChange={handleNewNumber}
                />
            </div>
            <div>
                <button id="add" type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm