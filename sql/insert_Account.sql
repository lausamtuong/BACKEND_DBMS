
CREATE PROCEDURE insert_Acc
	@id_user char(20),
	@password char(20),
	@new_username char(20),
	@type char(10),
	@id_clerk char(20),
	@id_customer char(20),
AS
BEGIN
	Declare @count INT;
	SET @count = 0;
	SET @count = (SELECT COUNT(*) FROM ACCOUNT WHERE username = @new_username);
	IF @count <> 0
	BEGIN
		PRINT('ERROR: USERNAME ALREADY EXIST !!!');
		
	END
	ELSE
	BEGIN
		INSERT INTO ACCOUNT
		VALUES (@id_user, @password, @new_username, @type, @id_clerk);
	END;
END

-- ko bị trùng username
EXEC insert_Acc 'ID129', 'US129', '129129', 'user', null
EXEC insert_Acc 'ID130', 'US130', '130130', 'user', null

-- bị trùng username (đã tồn tại)
EXEC insert_Acc 'ID129', 'US129', '129129', 'user', null

SELECT * FROM ACCOUNT